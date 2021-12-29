import { mount } from "enzyme";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('pruebas en <HeroScreen />', () => {
    
    test('debe mostrarse correctamente', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        
    });

    test('no debe mostrar el HeroScreen si no hay un héroe en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('h1').text().trim() ).toBe('No hero page');
    });

    test('debe mostrar un heroe si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('h3').text().trim() ).toBe('Spider Man');
    });

    test('debe regresar a la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                </Routes>
            </MemoryRouter>
        );
        
        wrapper.find('button').simulate('click');

        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });
    
    test('debe mostrar No hero page cuando intentamos acceder a la ruta de un héroe que no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spaiderman']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <HeroScreen /> } />
                    <Route path="/" element={ <h1>No hero page</h1> } />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('No hero page');        
    });
    
    
});
