import React from 'react';
import { connect } from 'react-redux';

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
    margin-top:50px;
`;

const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
    margin-top:40px;
`;

const NextButton = styled.Button``;


const Page = (props) => {

    const nextAction = () => {
        if(!props.name) {
            alert("Você precisa de um nome");
            return
        }

        props.navigation.navigate('StarterDias');
    }

    const handlerChangeName = (t) => {
        props.setName(t);
        props.navigation.setParams({name:t});
    }


    return (
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={handlerChangeName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
        </Container>
    );
}

Page.navigationOptions = ({navigation}) => {

    const nextAction = () => {
        if(!navigation.state.params || !navigation.state.params.name) {
            alert("Você precisa de um nome!");
            return
        }

        navigation.navigate('StarterDias');
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
        name:state.userReducer.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Page)