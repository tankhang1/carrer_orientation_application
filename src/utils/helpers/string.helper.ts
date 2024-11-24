export const isContainsHTMLTags = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
