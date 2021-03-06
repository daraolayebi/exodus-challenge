import React, { Fragment } from 'react';
import styled from 'styled-components';
import LinkIcon from './svg/LinkIcon';
import FormTabs from './FormTabs';
import StakesHistoryTable from './StakesHistoryTable';
import { 
    CURRENT_BALANCE, 
    NETWORK_FEE,
    calculateProjectedBalance, 
    calculateAmountToStake,
    formatDateTime, 
    generateRandomId, 
} from '../utils/index';

const InnerContainer = styled.div`
    width: 50%;
    margin: 0 auto;
    padding: 0 20px;
`;

const Form = styled.form`
    margin-top: 3em;
`;

const FormFieldset = styled.fieldset`
    position: relative;
    margin-bottom: 3em;
`;

const FormGroupDivider = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 1px;
    background: #2C3033;
    z-index: 1;
`;

const DividerIcon = styled.span`
    text-align: center;
    height: 12px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -12px;
    z-index: 2;

    svg {
        background-color: #1B1F22;    
        height: 22px;
    }
`;

const FormGroup = styled.div`
    width: 50%;
    display: inline-block;
`;

const FormLabel = styled.label`
    text-align: center;
    display: block;
    font-size: .8em;
    text-transform: uppercase;
`;

const FormInput = styled.input`
    font-size: 3.5em;
    font-family: inherit;
    text-align: center;
    width: 100%;
    color: ${({theme}) => theme.colors.purple};
    padding-top: 30px;
    background-color: transparent;
    border: none;

    &:focus {
        outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }
`;

const FormWarning = styled.small`
    color: ${({theme}) => theme.colors.red};
    text-align: center;
    display: block;
    padding-bottom: 10px;
`;


const FormButton = styled.button`
    display: block;
    margin: 0 auto;
    font-size: ${({theme}) => theme.fontSizes.md};
    font-family: inherit;
    text-transform: uppercase;
    color: #fff;
    min-width: 250px;
    width: 100%;
    padding: 15px 40px;
    border-radius: 100px;
    background: rgb(131,89,152);
    background: linear-gradient(100deg, rgba(131,89,152,1) 0%, rgba(104,62,164,1) 51%, rgba(69,30,186,1) 100%);
    border: none;
    transition: opacity .2s ease-in-out;

    &:focus {
        outline: none;
    }

    &:hover {
        opacity: .8;
    }

    &:disabled {
        opacity: .5;
    }
`;

const FormFooter = styled.small`
    display: block;
    text-align: center;
    font-size: 12px;
    padding-top: 20px;
`;

class StakingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectedBalance: 0,
            amountToStake: 0,
            stakes: [] || localStorage.getItem('stakes'),
            error: '',
        }
    }

    handleBalanceChange(event) {
        this.setState({ projectedBalance: event.target.value }, () => {
            calculateAmountToStake(this.state.projectedBalance)
                .then((response) => {
                    if(response > 0) {
                        this.setState({ amountToStake: response })
                    }
                })
                .catch((err) => alert(err));
        });
    }

    handleAmountChange(event) {
        this.setState({ amountToStake: event.target.value }, () => {
            this.handleProjectedValue(this.state.amountToStake);
        });
    }

    handleTabChange(tab) {
        const amount = (tab / 100) * CURRENT_BALANCE;
        this.setState({ amountToStake: amount }, () => {
            this.handleProjectedValue(this.state.amountToStake);
        });
    }

    handleProjectedValue(amount) {
        if (!amount || amount <= 0) this.setState({ projectedBalance: 0.00 });
        else {
            calculateProjectedBalance(amount)
                .then((response) => this.setState({ projectedBalance: response }))
                .catch((err) => alert(err));
        }
    }
    
    handleFormSubmit(event) {
        event.preventDefault();

        const newStake = {
            id: generateRandomId(),
            timestamp: formatDateTime(Date.now()),
            amount: this.state.amountToStake,
        }

        const newStakes = [...this.state.stakes, newStake];
        localStorage.setItem('stakes', JSON.stringify(newStakes));
        this.setState({ 
            stakes: newStakes,
            amountToStake: 0,
            projectedBalance: 0,
        });
    }

    render() {
        const { amountToStake, projectedBalance } = this.state;
        const fieldsAreEmpty = !amountToStake && !projectedBalance;
        const amountIsInvalid = amountToStake <= 0 || amountToStake > CURRENT_BALANCE;

        return (
            <Fragment>
                <Form onSubmit={this.handleFormSubmit.bind(this)}>
                    <FormFieldset>
                        <FormGroup data-tour="stake-amount">
                            <FormLabel htmlFor="amountToStake">Enter the amount
                                <FormInput 
                                    type="number" 
                                    id="amountToStake"
                                    name="amountToStake"
                                    step="0.01"
                                    max={CURRENT_BALANCE}
                                    value={amountToStake}
                                    onChange={this.handleAmountChange.bind(this)} />
                            </FormLabel>
                        </FormGroup>
            
                        <FormGroupDivider />
                        <DividerIcon>
                            <LinkIcon aria-hidden="true" />
                        </DividerIcon>
                        
                        <FormGroup data-tour="user-projected-balance">
                            <FormLabel htmlFor="projectedBalance">Balance in 1 year
                                <FormInput 
                                    type="number" 
                                    id="projectedBalance"
                                    name="projectedBalance"
                                    step="0.01"
                                    value={projectedBalance}
                                    onChange={this.handleBalanceChange.bind(this)}  />
                            </FormLabel>
                        </FormGroup>
                    </FormFieldset>

                    <InnerContainer>
                        <FormTabs onTabChange={(tab) => this.handleTabChange(tab)} />

                        <StakesHistoryTable transactions={this.state.stakes} />

                        { amountToStake > CURRENT_BALANCE && <FormWarning>{this.state.error}</FormWarning> }
                        <FormButton data-tour="stake-button" type="submit" disabled={fieldsAreEmpty || amountIsInvalid}>Stake Atom</FormButton>
                        <FormFooter>Network Fee: {NETWORK_FEE} ATOM</FormFooter>
                    </InnerContainer>
                </Form>
            </Fragment>
        );
    }
}

export default StakingForm;