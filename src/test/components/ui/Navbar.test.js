import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
const logout = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('pruebas en <NavBar />', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Pedro'
        },
        dispatch: (type) => logout(type)
    };
    
    test('debe mostrarse correctamente', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pedro');
    });
    
    test('debe llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        wrapper.find('.btn').simulate('click');

        expect( mockNavigate ).toHaveBeenCalledWith('login', {
            replace: true
        });

        expect( logout ).toHaveBeenLastCalledWith({ type: types.logout });
    });
    
    
});
