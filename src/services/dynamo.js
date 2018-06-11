import axios from 'axios';

export async function addBracketToDB(data) {
  const response = await axios.post(
    `https://2d9sav519f.execute-api.us-west-1.amazonaws.com/dev/todos/`,
      data,
  );
  return response;
}

export async function getAllBrackets() {
  const response = await axios.get(
    `https://2d9sav519f.execute-api.us-west-1.amazonaws.com/dev/todos/`
  );
  return response;
}

export async function getBrackets(data) {
  console.log(data);
  const response = await axios.get(
    `https://2d9sav519f.execute-api.us-west-1.amazonaws.com/dev/todos/`, {
      params: {
        email: data
      }
    });
    return response;
    /*.then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });*/
  }
