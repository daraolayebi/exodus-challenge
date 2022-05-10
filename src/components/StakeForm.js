import React, { Fragment } from 'react';
import styled from 'styled-components';
import LinkIcon from './svg/LinkIcon';
import FormTabs from './FormTabs';
import StakesHistoryTable from './StakesHistoryTable';
import { 
    CURRENT_BALANCE, 
    NETWORK_FEE,
    calculateProjectedBalance, 
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
    font-size: 3em;
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
            projectedBalance: 0.00,
            amountToStake: 0.00,
            stakes: [] || localStorage.getItem('stakes'),
        }
    }

    handleBalanceChange(event) {
        this.setState({ projectedBalance: event.target.value }, () => {});
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
        calculateProjectedBalance(amount)
            .then((response) => this.setState({ projectedBalance: response }))
            .catch((err) => alert(err));
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
            amountToStake: 0.00,
            projectedBalance: 0.00,
        });
    }

    render() {
        const { amountToStake, projectedBalance } = this.state;
        const fieldsAreEmpty = !amountToStake && !projectedBalance;
        const amountIsInvalid = amountToStake < 0 || amountToStake > CURRENT_BALANCE;

        return (
            <Fragment>
                <Form onSubmit={this.handleFormSubmit.bind(this)}>
                    <FormFieldset>
                        <FormGroup>
                            <FormLabel htmlFor="amountToStake">Enter the amount
                                <FormInput 
                                    type="number" 
                                    step="0.0001"
                                    id="amountToStake"
                                    name="amountToStake"
                                    pattern="^\d*(\.\d{0,2})?$"
                                    value={amountToStake}
                                    onChange={this.handleAmountChange.bind(this)} />
                            </FormLabel>
                        </FormGroup>
            
                        <FormGroupDivider />
                        <DividerIcon>
                            <LinkIcon aria-hidden="true" />
                        </DividerIcon>
                        
                        <FormGroup>
                            <FormLabel htmlFor="projectedBalance">Balance in 1 year
                                <FormInput 
                                    type="number" 
                                    step="0.0001"
                                    id="projectedBalance"
                                    name="projectedBalance"
                                    value={projectedBalance}
                                    onChange={this.handleBalanceChange.bind(this)}  />
                            </FormLabel>
                        </FormGroup>
                    </FormFieldset>

                    <InnerContainer>
                        <FormTabs onTabChange={(tab) => this.handleTabChange(tab)} />

                        <StakesHistoryTable transactions={this.state.stakes} />

                        <FormButton type="submit" disabled={fieldsAreEmpty || amountIsInvalid}>Stake Atom</FormButton>
                        <FormFooter>Network Fee: {NETWORK_FEE} ATOM</FormFooter>
                    </InnerContainer>
                </Form>
            </Fragment>
        );
    }
}

export default StakingForm;