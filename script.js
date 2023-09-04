
// dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");

// instantiate a new model
const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,
    model: 'gpt-3.5-turbo'
  });

// tests the output of the model
// console.log(model);

  // promptFunc sends the imput to the model
const promptFunc = async (input) => {
try {
    const res = await model.call(input);

    // Instantiation of a new object called "prompt" using the "PromptTemplate" class
    const prompt = new PromptTemplate({
      template: "You are a javascript expert and will answer the user's coding questions thoroughly as possible.\n{question}",
      inputVariables: ["question"],
    });

    const promptInput = await prompt.format({
      question: input
    });
    

    console.log(res);
}
catch (err) {
    console.error(err);
}
};
  
// initialize inquirer
const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };
  
  init();
  
  
  