import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import ResponsiveModal from "../components/Modals/ResponsiveModal";
import axios from "axios"
import { toast } from "react-toastify";

interface TimeSlotDto {
    date: string;
    startTime: string;
    endTime: string;
}

interface TrackDto {
    id: number
    type: string
    shape: string
    surface: string
    length: number
    lanes: number
}

interface DisciplineDto {
    id: number
    name: string
    approxDuration: Date
}

interface CreateEventDto {
    id?: number;
    name: string;
    minimumDuration: string;
    participantAgeGroup: string;
    maximumParticipants: number;
    participantsGender: string;
    timeSlot: TimeSlotDto;
    disciplineId: number;
    trackId: number;
}

const HomePage = () => {

    const [disciplines, setDisciplines] = useState<DisciplineDto[]>([])

    const [tracks, setTracks] = useState<TrackDto[]>([])

    const [event, setEvent] = useState<CreateEventDto>({
        name: "",
        minimumDuration: "00:10:00",
        participantAgeGroup: "Senior",
        maximumParticipants: 1,
        participantsGender: "0",
        timeSlot: {
            date: "",
            startTime: "",
            endTime: ""
        },
        disciplineId: 0,
        trackId: 0
    });

    const [events, setEvents] = useState<CreateEventDto[]>([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/tracks/get-all-tracks")
            .then(response => setTracks(response.data))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/discipline/get-all-disciplines")
            .then(response => setDisciplines(response.data))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/events/get-all-events")
            .then(response => setEvents(response.data))
            .catch(error => console.error(error))
    }, [])

    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

    const onCreateEvent = async () => {

        await axios.post("http://localhost:8080/api/events/add-event", event)
            .then(res => {
                toast.success("Event oprettet")

                setShowCreateEventModal(false)
            })
            .catch(err => {
                toast.error(err.response.data)
                console.error(err)
            })

    }

    const onDeleteEvent = async (eventToDelete: CreateEventDto) => {

        await axios.delete("http://localhost:8080/api/events/delete-event/" + encodeURIComponent(eventToDelete?.id as number))
            .then(res => {
                toast.success("Event slettet")
                setEvents(events.filter(event => event.id !== eventToDelete.id))
            })
            .catch(err => {
                toast.error("Der skete en fejl")
                console.error(err)
            })

    }

    return (
        <div className={"min-h-screen w-full flex flex-col items-center justify-center"}>
            {showCreateEventModal && (
                <ResponsiveModal
                    show={showCreateEventModal}
                    onClose={() => setShowCreateEventModal(false)}
                    onConfirm={onCreateEvent}
                    title={"Opret event"}
                >
                    <div className={"grid grid-cols-1 gap-4"}>
                        {/* Event name input */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Event navn</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Indtast event navn..."
                                className="input input-bordered w-full max-w-xs"
                                value={event.name}
                                onChange={(e) => setEvent({...event, name: e.target.value})}
                            />
                        </label>

                        {/* Maximum Participants input */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Maksimum deltagere</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Indtast antal..."
                                className="input input-bordered w-full max-w-xs"
                                value={event.maximumParticipants}
                                onChange={(e) => setEvent({...event, maximumParticipants: parseInt(e.target.value)})}
                            />
                        </label>

                        {/* Minimum Duration input */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Minimum varighed</span>
                            </div>
                            <input
                                type="time"
                                placeholder="Indtast varighed..."
                                className="input input-bordered w-full max-w-xs"
                                value={event.minimumDuration}
                                onChange={(e) => setEvent({...event, minimumDuration: e.target.value})}
                            />
                        </label>

                        {/* Participant Age Group input */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Deltager køn</span>
                            </div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={event.participantAgeGroup}
                                onChange={(e) => setEvent({...event, participantAgeGroup: e.target.value})}
                            >
                                <option disabled value={-1}>Vælg køn</option>
                                <option value={"Senior"}>Senior</option>
                                <option value={"Ung"}>Unge</option>
                            </select>
                        </label>

                        {/* Participants Gender select */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Deltager køn</span>
                            </div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={event.participantsGender}
                                onChange={(e) => setEvent({...event, participantsGender: e.target.value})}
                            >
                                <option disabled value={-1}>Vælg køn</option>
                                <option value={0}>Mand</option>
                                <option value={1}>Kvinde</option>
                                <option value={2}>Andet</option>
                            </select>
                        </label>

                        {/* Discipline select */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Disciplin</span>
                            </div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={event.disciplineId}
                                onChange={(e) => setEvent({...event, disciplineId: parseInt(e.target.value)})}
                            >
                                <option disabled value={0}>Vælg disciplin</option>
                                {disciplines.map(discipline => (
                                    <option key={discipline.id} value={discipline.id}>
                                        {discipline.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Track select */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Bane</span>
                            </div>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={event.trackId}
                                onChange={(e) => setEvent({...event, trackId: parseInt(e.target.value)})}
                            >
                                <option disabled value={0}>Vælg bane</option>
                                {tracks.map(track => (
                                    <option key={track.id} value={track.id}>
                                        Type: {track.type.toLowerCase()} -
                                        Form: {track.shape.toLowerCase()} - {track.surface} - {track.length}m
                                        - {track.lanes}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Time slot input */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Tidspunkt</span>
                            </div>
                            <input
                                type="date"
                                placeholder="Indtast dato..."
                                className="input input-bordered w-full max-w-xs"
                                value={event.timeSlot.date}
                                onChange={(e) => setEvent({
                                    ...event,
                                    timeSlot: {...event.timeSlot, date: e.target.value}
                                })}
                            />
                            <div className={"flex items-center gap-x-2 mt-2"}>
                                <input
                                    type="time"
                                    placeholder="Indtast start tid..."
                                    className="input input-bordered w-full max-w-xs"
                                    value={event.timeSlot.startTime}
                                    onChange={(e) => setEvent({
                                        ...event,
                                        timeSlot: {...event.timeSlot, startTime: e.target.value}
                                    })}
                                />
                                <input
                                    type="time"
                                    placeholder="Indtast start tid..."
                                    className="input input-bordered w-full max-w-xs"
                                    value={event.timeSlot.endTime}
                                    onChange={(e) => setEvent({
                                        ...event,
                                        timeSlot: {...event.timeSlot, endTime: e.target.value}
                                    })}
                                />
                            </div>
                        </label>

                    </div>
                </ResponsiveModal>
            )}
            <div className={"flex items-center justify-between w-full pb-10"}>
                <div>
                    <h1 className={"text-lg font-bold"}>Kommende events</h1>
                </div>
                <div>
                    <button
                        className={"btn btn-sm btn-success"}
                        onClick={() => setShowCreateEventModal(true)}
                    >
                        <PlusIcon className={"h-5 w-5"}/>
                        Opret event
                    </button>
                </div>
            </div>
            {events.length === 0 ? (
                <div className={"w-full flex items-center justify-center"}>
                    <h1 className={"text-lg font-bold"}>Ingen events oprettet</h1>
                </div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Navn</th>
                            <th>Aldersgruppe</th>
                            <th>Maks deltager</th>
                            <th>Deltager køn</th>
                            <th>Mindste varighed</th>
                            <th>Tidspunkt</th>
                            <th>Disciplin</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{event.name}</td>
                                <td>{event.participantAgeGroup}</td>
                                <td>{event.maximumParticipants}</td>
                                <td>{event.participantsGender}</td>
                                <td>{event.minimumDuration}</td>
                                <td>{event.timeSlot.date} - {event.timeSlot.startTime} - {event.timeSlot.endTime}</td>
                                <td>{disciplines.find(discipline => discipline.id === event.disciplineId)?.name}</td>
                                <td>
                                    <button className={"btn btn-sm btn-error"}
                                    onClick={() => onDeleteEvent(event)}>
                                        <TrashIcon className={"h-5 w-5"}/>
                                        Slet
                                    </button>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default HomePage;