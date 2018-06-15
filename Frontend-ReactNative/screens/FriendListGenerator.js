import React from 'react';
import { ScrollView, Alert, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements';

const friends = [
    {key: 'Caffe Strada', rating: 4, loc: 'Oakland', thumbnail: {url: 'https://s3-media3.fl.yelpcdn.com/bphoto/4qRdFTh5aZuoHrY_CJFU5g/ls.jpg'}},
    {key: 'Starbucks', rating: 5, loc: 'San Fransisco', thumbnail: {url: 'http://i0.wp.com/www.dailycal.org/assets/uploads/2013/07/starbucks-e1375211663338.jpeg'}},
    {key: 'People\'s Cafe', rating: 3.5, loc: 'Berkeley', thumbnail: {url: 'https://urukyu.files.wordpress.com/2016/05/27275945925_a1d0216567_z.jpg?w=560&h=9999'}},
    {key: 'SoDoI Coffee Tasting House', rating: 3.333, loc: 'Oakland', thumbnail: {url: 'https://www.sodoicoffee.com/wp-content/uploads/2015/03/20161219_124842-1024x576.jpg'}},
    {key: 'Berkeley Espresso', rating: 1, loc: 'Berkeley', thumbnail: {url: 'https://media-cdn.tripadvisor.com/media/photo-s/06/b9/63/e0/berkeley-espresso.jpg'}},
    {key: 'Philz Coffee', rating: 2, loc: 'Berkeley', thumbnail: {url: 'http://suisman.com/wp-content/uploads/2014/10/P1060811.jpg'}},
    {key: 'Peet\'s Coffee', rating: 5, loc: 'Oakland', thumbnail: {url: 'https://www.solanoshop.com/images/stores/Peets%20Coffee/peetsCoffee-03.jpg'}},
    {key: 'Sack\'s Coffee', rating: 100, loc: 'Oakland', thumbnail: {url: 'https://s3.amazonaws.com/secretsaucefiles/photos/images/000/076/644/large/IMG_5148.JPG?1481242535'}},
    {key: 'Allegro Coffee Roasters', rating: 61, loc: 'Berkeley', thumbnail: {url: 'https://media-cdn.tripadvisor.com/media/photo-s/02/38/7d/3a/eternity-coffee-roasters.jpg'}},
    {key: 'Rasa Caffe', rating: 4.7, loc: 'Oakland', thumbnail: {url: 'https://b.zmtcdn.com/data/pictures/2/17770152/13f3d0192c64506ab12c4367c87bee39_featured_v2.jpg'}},
    {key: 'Dunkin\' Donuts', rating: 9.8, loc: 'San Fransisco', thumbnail: {url: 'https://thumbor.forbes.com/thumbor/960x0/smart/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2Fb17fd0fa396b4617bb738d9f3911b881%2F960x0.jpg%3Ffit%3Dscale'}},
    {key: 'Blenz Coffee', rating: 3.56, loc: 'Berkeley', thumbnail: {url: 'https://s3-media1.fl.yelpcdn.com/bphoto/cIoRlOB3O6FnZ6WWm5_95A/l.jpg'}},
    {key: 'Tully\'s Coffee', rating: 9.99, loc: 'Berkeley', thumbnail: {url: 'http://www.king5.com/img/resize/content.king5.com/photo/2014/08/03/tullys-coffee-shop_5820849_ver1.0.jpg?mode=pad&bgcolor=000000&scale=both&width=750&height=422'}},
    {key: 'Caribou Coffee', rating: 5, loc: 'San Fransisco', thumbnail: {url: 'https://www.mspairport.com/sites/default/files/styles/carousel_full/public/images/carousel/Caribou_A.jpg?itok=8dDoFs9T'}},
    {key: 'Aroma Espresso Bar', rating: 4, loc: 'Berkeley', thumbnail: {url: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/25/10/ce/aroma-espresso-bar.jpg'}},
    {key: 'Jittery Joe\'s', rating: 9.99, loc: 'Berkeley', thumbnail: {url: 'https://cdn.shopify.com/s/files/1/1828/8259/files/jj-ritzc_1024x1024.jpg?v=1519765369'}},
    {key: 'Biggby Coffee', rating: 5, loc: 'San Fransisco', thumbnail: {url: 'http://www.annarbor.com/assets_c/2009/09/IMG_0992-thumb-300x225-10239.jpg'}},
    {key: 'Bridgehead Coffee', rating: 4, loc: 'Berkeley', thumbnail: {url: 'https://i.pinimg.com/originals/49/c7/20/49c720319e66b33b1e38fb9cb05ffeea.jpg'}},];

export class FriendListGenerator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: 'all',
            feed: friends,
        };

        this.filterSearch = this.filterSearch.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    filterSearch = (text) => {
        const textData = text.toLowerCase();
        const newFeed = friends.filter((item) => {
            const locData = item.loc.toLowerCase();
            const nameData = item.key.toLowerCase();
            return locData.match(textData) || nameData.match(textData);
        });
        this.setState({
            feed: newFeed
        })
    };

    renderHeader() {
        return <SearchBar
            lightTheme
            showLoading
            platform='ios'
            placeholder='Search'
            onChangeText={(text) => this.filterSearch(text)} />
    }

    render() {
        return (
            <List>
                <FlatList
                    data={this.state.feed}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.key}
                            subtitle={`${item.loc}, rating: ${item.rating}`}
                            avatar={item.thumbnail}
                        />
                    )}
                    keyExtractor={item => item.key}
                    ListHeaderComponent={this.renderHeader}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
