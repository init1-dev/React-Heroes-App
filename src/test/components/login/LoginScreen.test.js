import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

// const mockNavigate = jest.fn('/marvel', { replace: true });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en <LoginScreen />', () => {
    
    const contextValue = {
        user: {
            logged: false
        },
        dispatch: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('debe realizar el dispatch y la navegación', () => {
        
        const handleClick = wrapper.find('.btn').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({ type: types.login, payload: { name: 'In1t' } });

        expect( mockNavigate ).toHaveBeenCalledWith('/', { replace: true });

        localStorage.setItem('lastPath', '/dc');

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });
    });
    
});
