/**
 * @param {string} queryParamString - The url query parameter string. Possibly starts with '?'.
 * @returns An array of { key, value } objects representing all the query parameters.
 */
export function getQueryParameters(queryParamString) {
  // if (queryParamString[0] === '?') {
  //   queryParamString = queryParamString.slice(1);
  // }

  // return queryParamString
  //   .split('&')
  //   .map(paramStr => {
  //     const [key, value] = paramStr.split('=');
  //     return { key, value };
  //   });

  return { key: 'value' };
}

/**
 * @param {string} queryParamKey - The key of the query parameter to return
 * @param {queryParamString} - The url query parameter string to search
 * @returns {string} The value of the query parameter with key `queryParamKey`
 */
export function getQueryParameter(queryParamKey, queryParamString) {
  // const queryParams = getQueryParameters(queryParamString);
  // const param = queryParams.find(queryParam => queryParam.key === queryParamKey);
  // return param ? param.value : null;
  return { key: 'value' };
}