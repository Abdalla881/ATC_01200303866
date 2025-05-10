import {useRouteError} from 'react-router-dom'

const ErrorPage = () =>{
	const error = useRouteError();
	console.log(error);

	return (
		<div>
			<h1>Oops!</h1>
			<p>{error.statusText || error.message}</p>
		</div>
	)
}

export default ErrorPage;
