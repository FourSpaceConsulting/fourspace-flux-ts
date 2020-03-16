/**
 * Consumer
 */
export type Consumer = () => any;

/**
 * Event consumer
 * @param <T> event type
 */
export type EventConsumer<T> = (event: T) => any;
