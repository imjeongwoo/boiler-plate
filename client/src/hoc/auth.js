/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';


export default function (SpecificComponent, option, adminRoute = null) {

    /*
    option-----------------
    null -> 아무나 출입 가능
    true -> 로그인한 유저만 출입가능
    false -> 로그인한 유저는 출입 불가능
    */
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            // 페이지를 이동할때마다 request로 auth를 체크함
            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인 X
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 O
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])
        
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}