import groq from 'groq';

// assume the data set is small, so get all groups at once
export const GROUPS_QUERY = groq`*[_type == "group"]`;
export const PROGRAM_QUERY = groq`*[_type == "program"][0]`;
export const NAME_QUERY = groq`*[_type == "program"][0].title`;
