/**
 * Implements data propagation from JavaScript models to listeners.
 */
class Updateable {
    constructor() {
        this.listeners = [];
        this._self = this;
    }

    addListener(listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    }

    removeListener(listener) {
        var index = this.listeners.indexOf(listener);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    }

    refresh(component) {
        var self = this;
        var newState = {...self.state};

        component.setState(() => {
            return newState;
        });
    }

    fireStateChange() {
        var self = this;
        var newState = self.state;

        this.listeners.map((r) => {
            r.setState(() => {
                return newState;
            });
        });
    }

    init() {
        this.state = this.emptyState();
        this.fireStateChange();
    }

    clear() {
        this.init();
    }

    emptyState() {
        throw new Error('please implement emptyState() in subclasses of Updateable');
    }
}

export default Updateable;