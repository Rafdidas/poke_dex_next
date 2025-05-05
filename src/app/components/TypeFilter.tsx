'use client';

import TYPE_DATA from "@/data/typeData";
import { usePokemonStore } from "../store/pokemonStore";

import Image from "next/image";
import '../styles/typeFilter.style.scss';

export default function TypeFilter() {
    const { setSelectedType } = usePokemonStore();

    return (
        <ul className='type_list'>
          <li className='all_type' onClick={() => setSelectedType("")}>
            <span>전체 보기</span>
          </li>
          {
            TYPE_DATA.map((type) => {
              return (
                <li 
                  key={type.engType} 
                  className={`bg_${type.engType}`} 
                  onClick={() => setSelectedType(type.koreanType)}
                >
                    <Image src={`/assets/type_${type.engType}.svg`} width={100} height={100} alt={type.engType} />
                    <span>{type.koreanType}</span>
                </li>
              );
            })
          }
        </ul>
    )
}