// import GraphQL from tag
import {gql} from "graphql-tag";

// execute the me query set up using Apollo Server.
export const GET_ME = gql`
	{
		me {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;
