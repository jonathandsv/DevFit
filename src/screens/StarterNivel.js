import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';


const Container = styled.SafeAreaView`
    flex:1;
    align-items: center;
    background-color: #FFF;
    margin-left: 10px;
    margin-right:10px;
`;

const HeaderText = styled.Text`
    font-size:22px;
    color:#333;
    text-align: center;
    margin-bottom:10px;
    margin-top:20px;
`;

const BoldText = styled.Text`
    font-weight: bold;
`;

const NextButton = styled.Button``;

const LevelArea = styled.View`
    width:100%;
`;


const Page = (props) => {

    
    let funnyPhase = '';

    switch(props.workoutDays.length) {
        case 1:
            funnyPhase = 'Só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:
            funnyPhase = '2 Dias eu acho pouco, mas quem sou eu para te julgar?';
            break;
        case 3:
            funnyPhase = 'Legal, 3 dias dá para o gasto...';
            break;
        case 4:
            funnyPhase = 'Legal, 4 dias vai ser TOP!';
            break;
        case 5:
            funnyPhase = 'É isso aí, 5 dias é o mínimo, lets GO!';
            break;
        case 6:
            funnyPhase = 'É, 6 dias não é para todo mundo...';
            break;
        case 7:
            funnyPhase = 'Wooow! Todo dia?! WTF!';
            break;

    }

    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }

    return (
        <Container>
            <HeaderText>{funnyPhase}</HeaderText>
            <HeaderText><BoldText>Qual seu nível de hoje?</BoldText></HeaderText>
            
            <LevelArea>
                <DefaultButton bgcolor={props.level == 'beginner' ? '#A5E8BC' : false} onPress={() => setMyLevel('beginner')} width={300} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Iniciante / Um Frango</Text>
                </DefaultButton>
                
                <DefaultButton bgcolor={props.level == 'intermediate' ? '#A5E8BC' : false} onPress={() => setMyLevel('intermediate')} width={300} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Intermediário / Me viro bem</Text>
                </DefaultButton>

                <DefaultButton bgcolor={props.level == 'advanced' ? '#A5E8BC' : false} onPress={() => setMyLevel('advanced')} width={300} style={{marginBottom:20}} underlayColor="#CCC">
                    <Text>Avançado / Primo do The Rock</Text>
                </DefaultButton>
            </LevelArea>
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.level) {
            alert("Você precisa escolher uma opção!");
            return
        }

        navigation.navigate('StarterRecomendations');
    }

    return {
        title:'',
        headerRight:<NextButton title="Próximo" onPress={nextAction}/>,
        headerRightContainerStyle:{
            marginRight:10
        }
    }
}

const mapStateToProps = (state) => {
    return {
        level:state.userReducer.level,
        workoutDays: state.userReducer.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLevel:(level)=> dispatch({type:'SET_LEVEL', payload:{level}})
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Page)