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
} from './layouts';
import { Admin } from './layouts/Admin';
import App from './App';
import './index.css';
import { PageNotfound, Provider } from './components/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<PageNotfound />} />
                <Route path='/' element={<Login />} />

                <Route path='/home' element={<App />}>
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

                <Route path='/admin' element={<Admin />}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
);
