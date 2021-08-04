// import GraphQL
import { gql } from "@apollo/client";

// Login
export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`

// Add User
export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`

export const SAVE_BOOK = gql`
	mutation saveBook($content: bookData!) {
		saveBook(content: $content) {
			_id
			username
			savedBooks {
				bookId
				title
			}
		}
	}
`

// Remove Book
export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: String!) {
		removeBook(bookId: $bookId) {
			_id
			username
			savedBooks {
				bookId
				title
			}
		}
	}
`
