import { BoxInformation } from '../Types/types';
import ocean from '../img/ocean1.jpeg';
import ocean3 from '../img/ocean3.jpeg';

export const boxData: BoxInformation[] = [
  {
    image: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701316882.jpg',
    title: 'Report', 
    text: 'Atualizado de 1 em 1 hora - 24/7',
    url: '/report'
  },
  {
    image: ocean,
    title: 'Timeline', 
    text: 'Compartilhe e acompanhe reports de outros usuários',
    url: '/timeline'
  },
  {
    image: ocean3,
    title: 'Sobre nós', 
    text: 'Entenda como funciona',
    url: '/about'

  }
];
