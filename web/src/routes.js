import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CustomerHome from './pages/CustomerHome';

import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path='/'
					exact
					render={(props) => <CustomerHome {...props} component={'Home'} />}
				/>
				<Route
					path='/hairdressers'
					exact
					render={(props) => (
						<CustomerHome {...props} component={'Hairdressers'} />
					)}
				/>
				<Route
					path='/register'
					exact
					render={(props) => <CustomerHome {...props} component={'Register'} />}
				/>
				<Route
					path='/login'
					exact
					render={(props) => <CustomerHome {...props} component={'Login'} />}
				/>

				<Route
					path='/forgotpassword'
					exact
					render={(props) => (
						<CustomerHome {...props} component={'ForgotPassword'} />
					)}
				/>

				<Route
					path='/forgotpassword/newpassword/:passwordResetToken'
					exact
					render={(props) => (
						<CustomerHome {...props} component={'ResetPassword'} />
					)}
				/>

				<Route
					path='/hairdressers/:hairdresserId'
					render={(props) => (
						<CustomerHome {...props} component={'ViewHairdresser'} />
					)}
				/>
				<Route
					path='/bookings/new/hairdressers/:hairdresserId'
					render={(props) => (
						<CustomerHome {...props} component={'BookingFormNew'} />
					)}
				/>

				<Route
					path='/profile'
					exact
					render={(props) => <CustomerHome {...props} component={'Profile'} />}
				/>

				<Route
					path='/users/verify/:verificationToken'
					exact
					render={(props) => (
						<CustomerHome
							{...props}
							component={'EmailVerificationConfirmation'}
						/>
					)}
				/>

				<Route
					path='/bookings'
					exact
					render={(props) => <CustomerHome {...props} component={'Bookings'} />}
				/>
				<Route
					path='/bookings/new'
					exact
					render={(props) => (
						<CustomerHome {...props} component={'NewBooking'} />
					)}
				/>

				<Route path='/admin/login' exact component={AdminLogin} />
				<Route
					path='/admin'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminHomeMain'} />
					)}
				/>
				<Route
					path='/admin/menu'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminViewMenuItems'} />
					)}
				/>
				<Route
					path='/admin/menu/new'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminCreateMenuItem'} />
					)}
				/>
				<Route
					path='/admin/slots'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminViewSlots'} />
					)}
				/>
				<Route
					path='/admin/slots/new'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminCreateSlot'} />
					)}
				/>
				<Route
					path='/admin/users'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminViewUsers'} />
					)}
				/>
				<Route
					path='/admin/users/new'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminCreateUser'} />
					)}
				/>
				<Route
					path='/admin/bookings'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminViewBookings'} />
					)}
				/>
				<Route
					path='/admin/bookings/new'
					exact
					render={(props) => (
						<AdminHome {...props} component={'AdminCreateBooking'} />
					)}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
