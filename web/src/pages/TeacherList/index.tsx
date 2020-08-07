import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeacher(event: FormEvent){
        event.preventDefault();

        if (subject && week_day && time) {
            const response = await api.get('/classes', {
                params: {
                    subject,
                    week_day,
                    time
                }
            });

            setTeachers(response.data);
        } else {
            console.log('invalid request');
        }
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeacher}>
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
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' }
                        ]}
                        value={week_day}
                        onChange={event => setWeekDay(event.target.value)}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    );
}

export default TeacherList;