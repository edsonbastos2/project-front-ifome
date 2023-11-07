import Mail from './msg.svg'
import Envelope from './envelope.svg'

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
        </div>
    )
}