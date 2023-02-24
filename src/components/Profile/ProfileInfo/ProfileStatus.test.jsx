import {act, create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('render profile status', () => {
    test('update status was called', () => {
        const updateStatus = jest.fn();
        const component = create(
            <ProfileStatus
               status="initial"
               canEdit={true}
               updateStatus={updateStatus}
            />
        )
        const root = component.root;
        expect( root.findByType('span').children[0]).toBe('initial')
        expect(() => root.findByType('input')).toThrow()
        act(() => {
            root.findByType('span').props.onDoubleClick()
        })
        expect(() => root.findByType('span')).toThrow()
        expect( root.findByType('input').props.value).toBe('initial')
        act(() => {
            root.findByType('input').props.onBlur()
        })
        expect(() => root.findByType('input')).toThrow()
        expect(updateStatus).toBeCalled();
    })
})