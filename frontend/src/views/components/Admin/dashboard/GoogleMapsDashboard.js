import React from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import API from '../../../../service/api'
import {
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'


const GoogleMapsDashboard = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1buGDWqPdh1IcvWLZHOhimbj81Mrlf4o&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: -7.9397217, lng: 112.5931407 }}
    >
        {props.dataUMKM.map(marker => {
            let lattitude = parseFloat(marker.LATTITUDE);
            let longitude = parseFloat(marker.LONGITUDE);
            return (
                <MarkerWithInfoWindow
                    key={marker.ID_USER}
                    position={{ lat: lattitude, lng: longitude }}
                    content={marker.NAMA_PERUSAHAAN}
                    alamat={marker.ALAMAT}
                    nmrhp={marker.NOMOR_TELEPON}
                    email={marker.EMAIL}
                />
            )
        })}
    </GoogleMap>
));

class MarkerWithInfoWindow extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.onToggleOpen = this.onToggleOpen.bind(this);
    }

    onToggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <Marker
                position={this.props.position}
                onClick={this.onToggleOpen}
                icon={{
                    path: "M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z",
                    fillColor: "#e55353",
                    fillOpacity: 1.0,
                    strokeWeight: 0,
                    scale: 2.0
                }}
            >
                {this.state.isOpen && (
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>
                            <svg fill="#636f83" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M5.06 3C4.63 3 4.22 3.14 3.84 3.42C3.46 3.7 3.24 4.06 3.14 4.5L2.11 8.91C1.86 10 2.06 10.92 2.69 11.73C2.81 11.85 2.93 11.97 3.04 12.07C3.63 12.64 4.28 13 5.22 13C6.16 13 6.91 12.59 7.47 12.05C8.1 12.67 8.86 13 9.8 13C10.64 13 11.44 12.63 12 12.07C12.68 12.7 13.45 13 14.3 13C15.17 13 15.91 12.67 16.54 12.05C17.11 12.62 17.86 13 18.81 13C19.76 13 20.43 12.65 21 12.06C21.09 11.97 21.18 11.87 21.28 11.77C21.94 10.95 22.14 10 21.89 8.91L20.86 4.5C20.73 4.06 20.5 3.7 20.13 3.42C19.77 3.14 19.38 3 18.94 3M18.89 4.97L19.97 9.38C20.06 9.81 19.97 10.2 19.69 10.55C19.44 10.86 19.13 11 18.75 11C18.44 11 18.17 10.9 17.95 10.66C17.73 10.43 17.61 10.16 17.58 9.84L16.97 5M5.06 5H7.03L6.42 9.84C6.3 10.63 5.91 11 5.25 11C4.84 11 4.53 10.86 4.31 10.55C4.03 10.2 3.94 9.81 4.03 9.38M9.05 5H11V9.7C11 10.05 10.89 10.35 10.64 10.62C10.39 10.88 10.08 11 9.7 11C9.36 11 9.07 10.88 8.84 10.59C8.61 10.3 8.5 10 8.5 9.66V9.5M13 5H14.95L15.5 9.5C15.58 9.92 15.5 10.27 15.21 10.57C14.95 10.87 14.61 11 14.2 11C13.89 11 13.61 10.88 13.36 10.62C13.11 10.35 13 10.05 13 9.7M3 14.03V19C3 20.11 3.89 21 5 21C9.67 21 14.33 21 19 21C20.1 21 21 20.11 21 19V14.05C20.45 14.63 19.75 14.96 19 15C18 15.03 17.25 14.74 16.54 14.05C15.94 14.65 15.14 15 14.3 15C13.4 15 12.6 14.64 12 14.07C11.43 14.64 10.65 15 9.78 15C8.87 15 8.07 14.65 7.47 14.05C6.89 14.64 6.1 15 5.23 15C4.33 15 3.66 14.65 3 14.03Z" /></svg>
                            <b>  {this.props.content}</b><p></p>
                            <table className="table table-striped table-bordered" style={{ fontSize: "12px" }}>
                                <tr>
                                    <td>No. HP</td>
                                    <td>:</td>
                                    <td>{this.props.nmrhp}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>{this.props.alamat}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{this.props.email}</td>
                                </tr>
                            </table>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        );
    }
}

class FinalGoogleMaps extends React.Component {
    constructor() {
        super();
        this.state = {
            dataUMKM: [{
                ID_USER: '',
                NAMA_PERUSAHAAN: '',
                EMAIL: '',
                NOMOR_TELEPON: '',
                ALAMAT: '',
                LATTITUDE: '',
                LONGITUDE: ''
            }]
        };
    }

    componentDidMount() {
        API.googleMapsLocationUMKM().then(res => {
            this.setState({ dataUMKM: res.data })
        })
    }

    render() {
        const { dataUMKM } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader>
                        <strong>Maps UMKM</strong>
                    </CCardHeader>
                    <CCardBody>
                        <GoogleMapsDashboard dataUMKM={dataUMKM} />
                    </CCardBody>
                </CCard>
            </>
        )
    }

}

export default FinalGoogleMaps;
