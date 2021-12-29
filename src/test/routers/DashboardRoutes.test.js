import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

// MemoryRouter permite poder hacer evaluaciones y pruebas como si estuviera en el navegador web
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en <DashboardRoutes />', () => {
    
    const contextValue = {
        user: {
            logged: true,
            name: 'In1t'
        }
    };
    
    test('debe mostrarse correctamente la ruta por defecto, MARVEL', () => {
       
        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('In1t');
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');
    });
    
    test('debe mostrarse correctamente la ruta de DC', () => {
       
        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen');
    });

});
