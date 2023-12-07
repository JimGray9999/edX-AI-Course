
// dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  code: "Javascript code that answers the user's question",
  explanation: "detailed explanation of the example code provided",
});

const formatInstructions = parser.getFormatInstructions();

// instantiate a new model
const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 1,
    model: 'gpt-3.5-turbo'
  });

// promptFunc sends the imput to the model
const promptFunc = async (input) => {
try {
    const res = await model.call(input);

    // Instantiation of a new object called "prompt" using the "PromptTemplate" class
    const prompt = new PromptTemplate({
      template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{format_instructions}\n{question}",
      inputVariables: ["question"],
      partialVariables: { format_instructions: formatInstructions }
    });

    const promptInput = await prompt.format({
      question: input
    });
    
    console.log(await parser.parse(res));

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
  
  
  