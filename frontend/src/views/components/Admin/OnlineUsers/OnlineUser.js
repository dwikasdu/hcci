import React from "react";
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../../../service/auth/UserProvider"
// import io from "socket.io-client";

// let socket;

const OnlineUser = () => {
    // const { state } = useContext(AuthContext);
    // var id_user = '';
    // var nama_penanggung_jawab = '';
    // if (state.isAuthenticated === true) {
    //     id_user = state.user.ID_USER;
    //     nama_penanggung_jawab = state.user.nama_penanggung_jawab;
    // }
    // // console.log(nama_penanggung_jawab);

    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'http://localhost:3008';



    // useEffect(() => {
    //     async function dataFetch() {
    //         // const { name, room } = queryString.parse(location.search);
    //         const name = nama_penanggung_jawab;
    //         const room = 'umkm'

    //         socket = io(ENDPOINT);

    //         setRoom(room);
    //         setName(name)

    //         await socket.emit('join', { name, room }, (error) => {
    //             if (error) {
    //                 alert(error);
    //             }
    //         });
    //     }
    //     dataFetch()
    // }, [ENDPOINT, nama_penanggung_jawab]);

    // useEffect(() => {
    //     async function fetchData() {
    //         await socket.on('message', message => {
    //             setMessages(messages => [...messages, message]);
    //         });

    //         await socket.on("roomData", ({ users }) => {
    //             setUsers(users);
    //         });
    //     }
    //     fetchData()
    // }, []);

    // // const sendMessage = (event) => {
    // //     event.preventDefault();

    // //     if (message) {
    // //         socket.emit('sendMessage', message, () => setMessage(''));
    // //     }
    // // }

    // console.log("user", users);
    return (
        <div>
            {/* {JSON.stringify(users, null, 2)} */}
        </div>
    )
}

export default OnlineUser
