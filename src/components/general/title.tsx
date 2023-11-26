interface TitleProps {
    title: string
}

const Title:React.FC<TitleProps> = ({title}) => {
    return (
        <h1 className="text-2xl text-gray-800 font-medium">
            {title}
        </h1>
    )
}

export default Title;