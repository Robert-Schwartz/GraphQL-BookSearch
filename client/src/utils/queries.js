// import GraphQL from tag
import gql from "graphql-tag";

// export ME query
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
