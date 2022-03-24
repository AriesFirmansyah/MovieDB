import { 
    Skeleton
} from '@chakra-ui/react';
// import PlayButton from '../../../images/play-button.png';

const Loading = () => {
    return (
        <>
            <Skeleton sx={{borderRadius: '20px'}}>
                <div style={{height: '210px'}} />
            </Skeleton>
        </>
    );
};

export default Loading;