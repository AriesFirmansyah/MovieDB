import './css/App.css';

// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from 'react';
import Carousel from './components/Home/Carousel';
import NowPlaying from './components/Home/NowPlaying';
import Popular from './components/Home/Popular';

const App = () => {
  return (
    <>
      <Carousel />
      <NowPlaying />
      <Popular />
    </>
  );
}

// const Loading = () => {
//   return (
//     <>
//       <div style={{padding: '10px'}}>
//         {/* Navigation */}
//         <SimpleGrid columns={[4, 12, 12, 12, 12]} 
//           spacing={{base: "10px", sm: "10px", md: "40px", lg: "40px", xl : "40px" }} >
//           <GridItem colSpan={{base : 1, sm: 2, md: 2, lg: 1, xl : 1 }} >
//             <SkeletonCircle size='14' sx={{ height: '60px', width: '60px'}} />
//           </GridItem>
//           <GridItem colSpan={{base : 2, sm: 8, md: 8, lg: 9, xl : 9 }}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//           <GridItem colSpan={{base : 1, sm: 2, md: 2, lg: 2, xl : 2 }}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//         </SimpleGrid>

//         {/* Carousel */}
//         <Skeleton sx={{borderRadius: '13px', height: '400px', marginTop: '30px'}} />
        
//         <SimpleGrid columns={4} 
//           spacing={{base: "10px", md: "40px", lg: "40px", xl : "40px" }} 
//           sx={{marginTop: '30px'}}>
//           <GridItem colSpan={1}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//           <GridItem colSpan={1}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//           <GridItem colSpan={1}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//           <GridItem colSpan={1}>
//             <Skeleton sx={{borderRadius: '13px', height: '60px'}} />
//           </GridItem>
//         </SimpleGrid>
//       </div>
//     </>
//   )
// }


export default App;
