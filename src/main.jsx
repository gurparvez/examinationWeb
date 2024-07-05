import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    Login,
    Home,
    Courses,
    Examination,
    Page1,
    Profile,
    ShowForm,
    FormFill,
    User,
} from './layouts';
import { Admin, AdminProfile } from './Admin';
import App from './App';
import './index.css';
import { PageNotfound, Provider } from './components/index.js';
import AdminHome from './Admin/Home/AdminHome.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<PageNotfound />} />
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />

                <Route path='/user' element={<User />}>
                    <Route index element={<Home />} />
                    <Route path='courses' element={<Courses />} />
                    <Route path='examination' element={<Examination />} />
                    <Route path='regular'>
                        <Route
                            path='page1'
                            element={<Page1 regular={true} />}
                        />
                        <Route
                            path='page2'
                            element={<FormFill regular={1} />}
                        />
                    </Route>
                    <Route path='reappear'>
                        <Route
                            path='page1'
                            element={<Page1 regular={false} />}
                        />
                        <Route
                            path='page2'
                            element={<FormFill regular={0} />}
                        />
                    </Route>
                    <Route path=':formId' element={<ShowForm />} />
                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route path='/admin' element={<Admin />}>
                    <Route index element={<AdminHome />} />
                    <Route path='profile' element={<AdminProfile />} />
                    {/*todo: <Route path=':formId' element={<ShowForm />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
);
