import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Login, Home, Courses, Examination, Page1, Profile, ShowForm, FormFill, Form} from './layouts'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<App />}>
          <Route index element={<Home />} />
          <Route path='courses' element={<Courses />} />
          <Route path='examination' element={<Examination />} />
          <Route path='regular' element={<Form />}>
            <Route path='page1' element={<Page1 regular={true} />} />
            <Route path='page2' element={<FormFill regular={1} />} />
          </Route>
          <Route path='reappear' element={<Form />}>
            <Route path='page1' element={<Page1 regular={false} />} />
            <Route path='page2' element={<FormFill regular={0} />} />
          </Route>
          <Route path=':formId' element={<ShowForm />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
