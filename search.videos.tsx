import axios from "axios";
//import React, {Component, useState} from 'react';
import React from 'react';

type MyState = {
    data: any;
    search: string;
};

class Search extends React.Component<any, MyState>{

    constructor(props: any) {
        super(props)
        this.state = { data: null, search: "" }
    }

    render(): React.ReactNode {
        return (
            <div className="App">
                <h1 className="text-center ">
                    ASSIGNMENT YOUTUBE API
                </h1>
                <form id="form" onSubmit={this.submit}>
                    <div className="form-group">
                        <input name="search" value={this.state.search} type="text" className="form-control" id="search" onChange={this.onChange} />
                    </div>

                    <div className="text-center">
                        <input type="submit" className="btn btn-danger" value="Search Videos" />
                    </div>

                </form>

                {this.state ? this.state.data ? this.state.data.data.items.map((item: any) => {

                    return (<iframe width="420" height="315" src={`http://www.youtube.com/embed/${item.id.videoId}`} title={item.id.videoId}></iframe>
                    )

                })
                    : <div></div> : <div></div>}
            </div>



        );
    }



    A_key: any = "AIzaSyDYg0MSYDRNjUrVopUuN9tOAzgLCjT8BGA";
    //$("#form").submit(function(event)

    video: any = '';

    onChange = (e: any) => { this.setState({ search: e.currentTarget.value }) }

    submit = (event: any) => {
        const search = this.state.search
        console.log({ event })
        event.preventDefault();
        this.getUserInfo(this.A_key, search, 10);
    };

    getUserInfo(key: any, search: any, maxResult: any) {

        //search.empty()
        console.log("https://www.googleapis.com/youtube/v3/search?key=" + key
            + "&type=video&order=date&publishedAt=<SOME_DATE_TIME>&part=snippet&maxResults=" +
            maxResult + "&q=" + search,)

        axios.get("https://www.googleapis.com/youtube/v3/search?key=" + key
            + "&type=video&order=date&publishedAt=<SOME_DATE_TIME>&part=snippet&maxResults=" +
            maxResult + "&q=" + search, {
            withCredentials: false,

        }).then((response: any) => {
            console.log(response)
            axios.post('http://localhost:8080/product', response.data).then((result: any) => {
                console.log({ result });
                this.setState({ data: response });
            });
        })




        // data.items.forEach(item => {
        // this.video = `
        //   <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
        // `

        //})


        //data = this.video.append()

    }


}

export default Search;
