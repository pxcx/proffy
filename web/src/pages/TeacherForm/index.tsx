import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';


function TeacherForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: '', to: '', from: '' }
    ]);

    function addNewSchedueItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: '', to: '', from: '' }
        ])
    }

    function setScheduelItemValue(position: number, field: string, value: string) {
        const newArray = scheduleItems.map( (scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem
        });

        setScheduleItems(newArray);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule: scheduleItems
        }).then(response => {
            history.push('/');
        }).catch(error => {
            alert('Erro no cadastro!');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={event => setAvatar(event.target.value)}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={event => setBio(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            options={[
                                { value: 'Herbalismo', label: 'Herbalismo' },
                                { value: 'Alquimia', label: 'Alquimia' },
                                { value: 'Ferraria', label: 'Ferraria' },
                                { value: 'Joalheria', label: 'Joalheria' },
                                { value: 'Encantamento', label: 'Encantamento' },
                                { value: 'Mineração', label: 'Mineração' }
                            ]}
                            value={subject}
                            onChange={event => setSubject(event.target.value)}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora/aula"
                            value={cost}
                            onChange={event => setCost(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewSchedueItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map( (scheduleItem, index) => {
                            return <div key={index} className="schedule-item">
                                <Select
                                    value={scheduleItem.week_day}
                                    name="week_day"
                                    label="Dia da Semana"
                                    onChange={ event => setScheduelItemValue(index, 'week_day', event.target.value) }
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda' },
                                        { value: '2', label: 'Terça' },
                                        { value: '3', label: 'Quarta' },
                                        { value: '4', label: 'Quinta' },
                                        { value: '5', label: 'Sexta' },
                                        { value: '6', label: 'Sábado' }
                                    ]}
                                />
                                <Input 
                                    type="time" 
                                    name="from" 
                                    label="Das"
                                    value={scheduleItem.from}
                                    onChange={ event => setScheduelItemValue(index, 'from', event.target.value) }
                                />
                                <Input 
                                    type="time" 
                                    name="to" 
                                    label="Até"
                                    value={scheduleItem.to}
                                    onChange={ event => setScheduelItemValue(index, 'to', event.target.value) }
                                />
                            </div>
                        })}

                        

                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar Cadastro</button>
                    </footer>
                
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;