import { PokemonData } from '@/types/pokemon';
import Image from 'next/image';

import '../styles/pokeBall.style.scss';
import pixelBall from '@/assets/pixel_ball.png'
import Link from 'next/link';

export default function PokemonBox(props: PokemonData) {
    const { name, pokeId, poke_img, types } = props;

    return (
        <Link href={`/pokemon/${pokeId}`}>
            <div className='poke_ball' >
                <div className='name_section'>
                    <Image src={pixelBall} alt="pixel_ball" />
                    <p className='poke_name'>{pokeId}. {name}</p>
                </div>
                
                <div className='poke_img'>
                    <Image src={poke_img} alt={name} width={100} height={100} />
                </div>
                <ul className='poke_type'>
                {
                    types.map((type) => {
                    return (
                        <li 
                            key={type.name} 
                            className={`bg_${type.engType}`}
                        >
                            <span>{type.koreanType}</span>
                        </li>
                    )
                    })
                }
                </ul>
                
            </div>
        </Link>
    )

}

