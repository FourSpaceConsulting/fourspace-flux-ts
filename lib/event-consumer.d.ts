/**
 * Event consumer
 * @param <T> ebent type
 */
export interface EventConsumer<T> {
    /**
     * @param event event
     */
    (event: T): any;
}
