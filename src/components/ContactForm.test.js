import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const firstNameInputSetUp = (input) =>{
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, input);
}

const lastNameInputSetUp = (input) =>{
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, input);

}

const emailInputSetUp = (input) =>{
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, input);

}

const clickSubmit = () =>{
    const submitButton = screen.getByTestId('submitButton');
    userEvent.click(submitButton);
}

test('renders without errors', ()=>{
    render(<ContactForm errors={[]}/>); 
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async() => {
    render(<ContactForm />);
    firstNameInputSetUp('e');
    const firstNameError = screen.getByText(/firstName must have at least 5 characters./i);
    expect(firstNameError).toBeInTheDocument;
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    clickSubmit();
    
    firstNameInputSetUp('');
    const firstNameError = screen.getByText(/firstName must have at least 5 characters./i);
    expect(firstNameError).toBeInTheDocument;
    
    lastNameInputSetUp('');
    const lastNameError = screen.getByText(/Error: lastName is a required field./i);
    expect(lastNameError).toBeInTheDocument;
    
    emailInputSetUp('');
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument;
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    expect(render(<ContactForm />));
    firstNameInputSetUp('Justin');
    lastNameInputSetUp('Burk');
    emailInputSetUp('');
    clickSubmit();
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument;

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    expect(render(<ContactForm />));
    firstNameInputSetUp('Justin');
    lastNameInputSetUp('Burk');
    emailInputSetUp('blueBill');
    clickSubmit();
    const emailError = screen.getByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument;
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    expect(render(<ContactForm />));
    firstNameInputSetUp('Justin');
    lastNameInputSetUp('');
    emailInputSetUp('blueBill@hotmail.com');
    clickSubmit();
    const lastNameError = screen.getByText(/Error: lastName is a required field./i);
    expect(lastNameError).toBeInTheDocument;
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    expect(render(<ContactForm />));
    firstNameInputSetUp('Justin');
    lastNameInputSetUp('Burk');
    emailInputSetUp('blueBill@hotmail.com');
    clickSubmit();
    const allErrors = screen.findAllByTestId('error');
    expect(allErrors).not.toBeInTheDocument
});

test('renders all fields text when all fields are submitted.', async () => {
    expect(render(<ContactForm />));
    firstNameInputSetUp('Justin');
    lastNameInputSetUp('Burk');
    emailInputSetUp('blueBill@hotmail.com');
    clickSubmit();
    const firstName = screen.getAllByText('Justin');
    const lastName = screen.getAllByText('Burk');
    const email = screen.getAllByText('blueBill@hotmail.com');
    expect(firstName).toBeInTheDocument;
    expect(lastName).toBeInTheDocument;
    expect(email).toBeInTheDocument;

});