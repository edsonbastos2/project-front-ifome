import Mail from './msg.svg'
import Envelope from './envelope.svg'
import Location from './location.svg'
import RigthArrow from './rigthArrow.svg'
import Card from './card.svg'
import Cupom from './cupom.svg'
import Checked from './checked.svg'
import Cash from './cash.svg'

type Props = {
    icon: string
    color: string
    width: number
    height: number
}

export const Icon = ({ color, height, icon, width}:Props) => {

    return(
        <div style={{width, height}}>
            { icon === 'mailSent' && <Mail color={color}/>}
            { icon === 'envelope' && <Envelope color={color}/>}
            { icon === 'card' && <Card color={color}/>}
            { icon === 'location' && <Location color={color}/>}
            { icon === 'cupom' && <Cupom color={color}/>}
            { icon === 'checked' && <Checked color={color}/>}
            { icon === 'cash' && <Cash color={color}/>}
            { icon === 'rigtharrow' && <RigthArrow color={color}/>}
        </div>
    )
}