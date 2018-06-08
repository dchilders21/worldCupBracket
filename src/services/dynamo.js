import axios from 'axios';

export async function addBracketToDB(data) {
  const response = await axios.post(
    `https://2d9sav519f.execute-api.us-west-1.amazonaws.com/dev/todos/`,
      data,
  );
  return response;
}

export async function getBrackets(data) {
  const response = await axios.get(
    `https://2d9sav519f.execute-api.us-west-1.amazonaws.com/dev/todos/`)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
