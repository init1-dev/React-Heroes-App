import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

// Es imprescindible poner mock delante del nombre que queramos darle a la constante para evitar errores de scope
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('pruebas en <SearchScreen />', () => {
    
    test('debe mostrarse correctamente con valores por defecto', () => {
       
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Introduce un héroe a buscar');
    });
    
    test('debe mostrar a Batman y el input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });
    
    test('debe mostrar un mensaje de error si no se encuentra el heroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman1234'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').exists() ).toBe( true );
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No hay resultados para: batman1234');
    });
    
    test('debe llamar el navigate a la nueva pantalla (nuevo url)', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            // preventDefault(){}
            preventDefault: () => {}
        })

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');
        
    });
    
    
});