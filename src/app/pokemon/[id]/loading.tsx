import Image from 'next/image';
import '../../styles/loding.style.scss';

const ball_list = [
  { id: 1, ball_img: '/assets/pokeball2.png' },
  { id: 2, ball_img: '/assets/masterball.png' },
  { id: 3, ball_img: '/assets/megaball.png' },
  { id: 4, ball_img: '/assets/ultraball.png' },
];

export default function Loading() {
  return (
    <div id="loading">
      <div className="load_box">
        <h3>Loading...</h3>
        <ul className="pokeballs">
          {ball_list.map((ball) => (
            <li key={ball.id}>
              <Image
                src={ball.ball_img}
                alt="ball"
                width={40}
                height={40}
                priority 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
