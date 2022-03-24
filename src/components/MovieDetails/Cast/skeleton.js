import { 
    Skeleton
} from '@chakra-ui/react';

const Loading = () => {
    return (
        <>
            <Skeleton sx={{ borderRadius: '20px 20px 0px 0px'}}>
                <div className='cast-image' />
            </Skeleton>
        </>
    );
};

export default Loading;