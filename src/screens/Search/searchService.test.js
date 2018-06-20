const searchService = require("./searchService");

test('given a list of search filters builds the right search term', () => {

  //Given
  const termStr = '{"[Author]":"Suay Mas", "[Title]":"Valencia"}';
  const term = JSON.parse(termStr);

  //When
  const res = searchService.buildTerm(term, {});

  //Then
  expect(res).toBe("Suay+Mas[Author]+AND+Valencia[Title]");
});

test('given a list of search filters and a list of dates builds the right search term', () => {

  //Given
  const termStr = '{"[Author]":"Suay Mas", "[Title]":"Valencia"}';
  const term = JSON.parse(termStr);

  const dates = {"from[DP]": "2015/01/01", "to[DP]":"2018/01/01"}

  //When
  const res = searchService.buildTerm(term, dates);

  //Then
  expect(res).toBe("Suay+Mas[Author]+AND+Valencia[Title]+AND+(2015/01/01[DP]:2018/01/01[DP])");
});
