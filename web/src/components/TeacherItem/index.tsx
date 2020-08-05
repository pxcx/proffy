import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/1056505?s=460&u=e48536875ece7c5547bf7d2ce8db01cce4d47b60&v=4" alt="Paulo Cezar"/>
                <div>
                    <strong>Lorem Ipsum</strong>
                    <span>Dolor sit amet</span>
                </div>
            </header>

            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br /><br />
                Architecto maxime cupiditate aperiam voluptas ipsum sint laudantium aliquam maiores cumque excepturi? Quibusdam provident sit nulla autem vitae blanditiis molestias numquam quos.
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;