import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import heartOutilineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
    id: number;
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
};

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsApp() {
        api.post('connections', {
            user_id: teacher.id
        });
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray =[]
        if (favorites) {
            favoritesArray  = JSON.parse(favorites);
        }

        if (isFavorited) {
            // removing from favorites in storage
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            // adding to favorites in storage
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    source={{ uri: 'https://github.com/pxcx.png'}}
                    style={styles.avatar}
                />
                
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text  style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'  '}
                    <Text style={styles.priceValue}>R$ {teacher.cost.toFixed(2)}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {} 
                        ]}
                    >
                        {
                            isFavorited 
                            ? <Image source={unfavoriteIcon} /> 
                            :<Image source={heartOutilineIcon} />

                        }
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsApp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;