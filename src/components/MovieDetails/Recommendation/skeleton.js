import { 
    Skeleton
} from '@chakra-ui/react';

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