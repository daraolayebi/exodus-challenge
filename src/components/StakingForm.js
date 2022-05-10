import React from 'react';
import styled from 'styled-components';
import LinkIcon from './svg/LinkIcon';
import FormTabs from './FormTabs';

const InnerContainer = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 0 20px;
`;

const Form = styled.form`
    margin-top: 3em;
`;

const FormFieldset = styled.fieldset`
    display: flex;
    justify-content: center;
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
    display: inline-block;
    margin: 1em;

    &:first-of-type,
    &:first-of-type input {
        text-align: right;
    }
`;

const FormLabel = styled.label`
    text-align: center;
    margin-top: 3em;
    font-size: .8em;
    text-transform: uppercase;
`;

const FormInput = styled.input`
    font-size: ${({theme}) => theme.fontSizes.xl};
    font-family: inherit;
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
`;

const FormFooter = styled.small`
    display: block;
    text-align: center;
    font-size: 12px;
    padding-top: 10px;
`;

class StakingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectedBalance: 0,
            amountToStake: 0,
            currentBalance: 100, 
            currentTab: 25,
        }
    }

    handleFormOnChange({ target }) {
        console.log(target.value);
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
    }
    
    handleFormOnSubmit(event) {
        event.preventDefault();
        // const { amountToStake } = this.state;
        // let amountAsBigNumber = ethers.utils.parseEther(amount.toString());
        // this.props.onSubmit(amountAsBigNumber);
    }

    handleTabChange(tab) {
        this.setState({ currentTab: tab });
    }

    render() {
        return (
            <Form onSubmit={() => this.handleFormOnSubmit()}>
                <FormFieldset>
                    <FormGroup>
                        <FormLabel htmlFor="amount">Enter the amount
                            <FormInput 
                                type="number" 
                                placeholder="0.00" 
                                id="amount"
                                name="amount"
                                value={this.state.amountToStake}
                                onChange={(e) => this.handleFormOnChange(e)} />
                        </FormLabel>
                    </FormGroup>
        
                    <FormGroupDivider />
                    <DividerIcon>
                        <LinkIcon aria-hidden="true" />
                    </DividerIcon>
                    
                    <FormGroup>
                        <FormLabel htmlFor="balanceInOneYear">Balance in 1 year
                            <FormInput 
                                type="number" 
                                placeholder="0.00" 
                                id="balanceInOneYear"
                                name="balanceInOneYear"
                                value={this.state.projectedBalance}
                                onChange={(e) => this.handleFormOnChange(e)}  />
                        </FormLabel>
                    </FormGroup>
                </FormFieldset>

                <InnerContainer>
                    <FormTabs onTabChange={(tab) => this.handleTabChange(tab)} />
                    <FormButton type="submit">Stake Atom</FormButton>
                    <FormFooter>Network Fee: 0.005075 ATOM</FormFooter>
                </InnerContainer>
            </Form>
        );
    }
}

export default StakingForm;