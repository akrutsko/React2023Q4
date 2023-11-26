import Image from 'next/image';

const style = {
  display: 'grid',
  placeContent: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'white',
};

export default function Custom404() {
  return (
    <div style={style}>
      <Image
        src="/assets/images/404.png"
        width={704}
        height={534}
        alt="no page found"
      />
    </div>
  );
}
