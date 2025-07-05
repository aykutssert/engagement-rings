import { useState } from 'react';

export default function ProductCard({ product }) {
    const [selectedColor, setSelectedColor] = useState('yellow');

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} style={{color: '#fbbf24'}}>★</span>);
            } else {
                stars.push(<span key={i} style={{color: '#e5e7eb'}}>★</span>);
            }
        }
        return stars;
    };

    // Color name mapping
    const getColorName = (color) => {
        switch(color) {
            case 'yellow': return 'Yellow Gold';
            case 'rose': return 'Rose Gold';
            case 'white': return 'White Gold';
            default: return 'Yellow Gold';
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
        }}>
            <Image
                src={product.images[selectedColor]}
                alt={product.name}
                style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    marginBottom: '16px'
                }}
            />

            
            <h3 style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: '15px', marginBottom: '4px' }}>
                {product.name}
            </h3>
            <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '15px', marginBottom: '4px' }}>
                ${product.price} USD
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {Object.keys(product.images).map(color => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: selectedColor === color ? '1px solid #374151' : 'none',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            flexShrink: 0
                        }}
                    >
                        <div style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            flexShrink: 0,
                            backgroundColor: 
                                color === 'yellow' ? '#E6CA97' : 
                                color === 'rose' ? '#E1A4A9' : 
                                '#D9D9D9'
                        }} />
                    </button>
                ))}
            </div>

            <p style={{ fontFamily: 'Avenir', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                {getColorName(selectedColor)}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex' }}>
                    {renderStars(product.popularityRating)}
                </div>
                <p style={{ fontFamily: 'Avenir', fontSize: '14px', margin: 0 }}>
                    {product.popularityRating}/5
                </p>
            </div>
        </div>
    );
}