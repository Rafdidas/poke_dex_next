
import { fetchPokemonDataById } from "@/lib/fetchPokemonDataById";
import Image from "next/image";
import { notFound } from "next/navigation";

import '../../styles/pokemonDetailPage.style.scss';

import backBtn from '@/assets/pixel_ball.png';
import Link from "next/link";

type PageProps = {
    params: { id: string };
};

export default async function PokemonDetailPage({ params }: PageProps) {
    const { id } = params;
    try {
        const data = await fetchPokemonDataById(Number(id));
        
        return (
            <main id="detail_page">
                <div className="detail_inner">
                    <div className="detail_img">
                        <Image src={data.poke_img} alt={data.name} width={100} height={100} />
                    </div>
                    <div className="name_info">
                        <p className="poke_id">#{data.pokeId}</p>
                        <h1 className="poke_name">{data.name}</h1>
                        <p className="poke_generas">{data.generas}</p>
                    </div>
                    <ul className="poke_type">
                    {data.types.map((type) => (
                        <li key={type.name} className={`bg_${type.engType}`} >
                            <Image src={`/assets/type_${type.engType}.svg`} width={100} height={100} alt={type.engType} />
                            <span>{type.koreanType}</span>
                        </li>
                    ))}
                    </ul>
                    <p className="poke_summary">{data.flavorTexts}</p>
                    <div className="extra_info">
                        <div className="measurements">
                            <p><strong>키</strong>: {data.height.toLocaleString()} m</p>
                            <p><strong>몸무게</strong>: {data.weight.toLocaleString()} kg</p>
                        </div>

                        <div className="abilities">
                            <h3>특성</h3>
                            <ul>
                            {data.abilities.map((ability) => (
                                <li key={ability.name}>
                                {ability.name} {ability.is_hidden && ""}
                                </li>
                            ))}
                            </ul>
                        </div>

                        <div className="stats">
                            <h3>능력치</h3>
                            <ul>
                            {data.stats.map((stat) => (
                                <li key={stat.name}>
                                {stat.name}: {stat.value}
                                </li>
                            ))}
                            </ul>
                        </div>

                        <div className="breeding">
                            <p><strong>성별 비율</strong>: {data.genderRate === -1 ? "성별 없음" : `${(12.5 * (8 - data.genderRate)).toFixed(1)}% ♂ / ${(12.5 * data.genderRate).toFixed(1)}% ♀`}</p>
                            <p><strong>알 그룹</strong>: {data.eggGroups.join(", ")}</p>
                        </div>
                        {/* {data.evolution.length > 0 && (
                        <section className="evolution_section">
                            <h2>진화 경로</h2>
                            <ul className="evolution_list">
                            {data.evolution.map((evo) => (
                                <li key={evo.id} className="evolution_item">
                                <Image
                                    src={evo.image}
                                    alt={evo.name}
                                    width={80}
                                    height={80}
                                />
                                <p>{evo.name}</p>
                                </li>
                            ))}
                            </ul>
                        </section>
                        )} */}
                    </div>
                    <Link href="/">
                    <p className="back_btn" >
                        <Image src={backBtn} width={24} height={24} alt="masterball"/>
                        <span >뒤로 가기</span>
                    </p>
                    </Link>
                </div>
            </main>
        )
    } catch {
        notFound();
    }
}